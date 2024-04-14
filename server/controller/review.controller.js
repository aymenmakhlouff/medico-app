const { orderBy } = require('lodash');
const {Review,Doctor,User,Pharmacy} = require('../database/index')


module.exports = {
    getAllForDoctor: async (req, res) => {

      try {
        const doctorId = req.params.doctorId;
        const reviews = await Review.findAll({
          where: { doctorId: doctorId },
          
          include : User,
          order:[['createdAt','DESC']]
        }
      
        );
        res.json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },
    getAllForPharmacy: async (req, res) => {

      try {
        const pharmacyId = req.params.pharmacyId;
        const reviews = await Pharmacy.findOne({
          where: { id: pharmacyId },
          
          include : [{model:Review,
          include:User
          
          }],
          order:[['createdAt','DESC']]
        }
      
        );
        res.json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },
    createReviewForDoctor: async (req, res) => {
      const { doctorId, email, rating, comment} = req.body
    //  const { id} = req.body

// console.log(id);
      try {

      const user = await User.findOne({
        where : {
          email : email
        }
      })
        const newReview = await Review.create({
          DoctorId: doctorId,
          UserId: user.id,
          review: comment,
          rating: rating,
        });
        const getReviews=await Doctor.findOne({
          where:{id:doctorId},
           include: { model: Review }

        })
        const updatedRating =
        getReviews.Reviews.reduce((acc, review) => acc + review.rating, 0) /
        getReviews.Reviews.length;

    const updateDoctorRating=await Doctor.update({
      rating:updatedRating
      
    },{
      where:{id:doctorId}
    })
        res.json(getReviews);
      } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },
    createReviewForPharmacy: async (req, res) => {
      const { pharmacyId, email, rating, comment} = req.body
    //  const { id} = req.body

// console.log(id);
      try {

      const user = await User.findOne({
        where : {
          email : email
        }
      })
        const newReview = await Review.create({
          PharmacyId: pharmacyId,
          UserId: user.id,
          review: comment,
          rating: rating,
        });
        const getReviews=await Pharmacy.findOne({
          where:{id:pharmacyId},
           include: { model: Review }

        })
        const updatedRating =
        getReviews.Reviews.reduce((acc, review) => acc + review.rating, 0) /
        getReviews.Reviews.length;

    const updatePharmacyRating=await Pharmacy.update({
      rating:updatedRating
      
    },{
      where:{id:pharmacyId}
    })
        res.json(getReviews);
      } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },
    deleteOne: async (req, res) => {
      let id = req.params.id;
      try {
        const deletedReview = await Review.destroy({
          where: { id: Number(id) },
        });
        res.json(deletedReview);
      } catch (error) {
        throw error;
      }
    },

    getAllForPharmacyProfile: async (req, res) => {

      try {
        const reviews = await Pharmacy.findOne({
          where: { id: req.params.idPharma },
          
          include : [{model:Review,
          include:User
          
          }],
          order:[['createdAt','DESC']]
        }
      
        );
        res.json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    },

  };

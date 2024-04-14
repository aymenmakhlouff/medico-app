const { User, Order, Pharmacy, Products, Review, Record, Categories, Availability, Doctor, Speciality } = require("../index.js");


const dummyOrders = [
  {
    quantityOrdered: 5,
    orderStatus: "Pending",
    livraisonStatus: "Pending",
    tracking_number: "ABC12345",
    total: 50.99,
    acceptedAt: null,
    dilevredAt: null,
    ProductId:1,
    UserId:1
  },
  {
    quantityOrdered: 3,
    orderStatus: "Accepted",
    livraisonStatus: "Out for Delivery",
    tracking_number: "DEF67890",
    total: 30.49,
    acceptedAt: new Date("2023-01-15"),
    dilevredAt: null,
    ProductId:2,
    UserId:2
  },
  {
    quantityOrdered: 7,
    orderStatus: "Rejected",
    livraisonStatus: "Processing",
    tracking_number: "GHI12345",
    total: 70.25,
    acceptedAt: null,
    dilevredAt: null,
    ProductId:3,
    UserId:3
  },
  {
    quantityOrdered: 2,
    orderStatus: "Accepted",
    livraisonStatus: "Delivered",
    tracking_number: "JKL56789",
    total: 20.99,
    acceptedAt: new Date("2023-02-10"),
    dilevredAt: new Date("2023-02-12"),
    ProductId:4,
    UserId:4
  },
  {
    quantityOrdered: 4,
    orderStatus: "Pending",
    livraisonStatus: "Shipped",
    tracking_number: "MNO45678",
    total: 40.75,
    acceptedAt: null,
    dilevredAt: null,
  },
];
  
  const dummyPharmacies = [
    {
      PHname: "Pharmacy Tourville",
      imageUrl: "https://i.pinimg.com/564x/1f/f4/a0/1ff4a0ba5dd2dc730903bd897621fd8f.jpg",
      type: "day",
      lang: 36.78,
      lat: 10.45,
      adress: "123 Main Street",
    },
    {
      PHname: "Pharmacy Khlifi",
      imageUrl: "https://enseigne.tn/wp-content/uploads/2019/02/facade-pharmacie-tunisie.jpg",
      type: "night",
      lang: 34.56,
      lat: 11.23,
      adress: "456 Elm Street",
    },
    {
      PHname: "Pharmacy Yanes",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKbb88LgNMwbClkjB1Cj-GJcKgw10qERgRcBrQIpSa7FXNiUTkB_EtyCbwi2W9iqlIdM&usqp=CAU",
      type: "day",
      lang: 35.67,
      lat: 9.87,
      adress: "789 Oak Avenue",
    },
    {
      PHname: "Pharmacy Delight",
      imageUrl: "https://www.digilor.fr/wp-content/uploads/2019/04/solution-digitalisation-pharmacie-vitrine.jpg",
      type: "night",
      lang: 33.98,
      lat: 12.34,
      adress: "567 Pine Road",
    },
    {
      PHname: "Pharmacy Centre ville",
      imageUrl: "https://i0.wp.com/lapresse.tn/wp-content/uploads/2021/07/pharmaciee.jpg?fit=850%2C491&ssl=1",
      type: "day",
      lang: 37.12,
      lat: 10.89,
      adress: "101 Cedar Lane",
    },
  ];
  
  const dummyProducts = [
    {
      category: "Pain Relief",
      productName: "Aspirin",
      price: 5.99,
      stock: 100,
      description: "Relieves pain and reduces fever",
      manufacturer: "Bayer",
      activeIngredients: "Acetylsalicylic Acid",
      dosageForm: "Tablet",
      strength: "500 mg",
      packaging: "Bottle",
      expiryDate: new Date("2023-12-31"),
      imageURL: "https://banner2.cleanpng.com/20180705/bfa/kisspng-aspirin-skin-face-pharmaceutical-drug-acne-garrapata-5b3e5155d77c20.6523674615308107098826.jpg",
      codebar: 123456789,
    },
    {
      category: "Antibiotics",
      productName: "Amoxicillin",
      price: 8.99,
      stock: 50,
      description: "Treats bacterial infections",
      manufacturer: "Generic",
      activeIngredients: "Amoxicillin",
      dosageForm: "Capsule",
      strength: "500 mg",
      packaging: "Blister pack",
      expiryDate: new Date("2023-10-15"),
      imageURL: "https://www.pyxuspharmaceuticals.com/wp-content/uploads/2022/09/AMOXICILLIN.png",
      codebar: 987654321,
    },
    {
      category: "Allergy and Sinus",
      productName: "Cetirizine",
      price: 6.49,
      stock: 75,
      description: "Relieves allergy symptoms",
      manufacturer: "Zyrtec",
      activeIngredients: "Cetirizine",
      dosageForm: "Tablet",
      strength: "10 mg",
      packaging: "Box",
      expiryDate: new Date("2023-09-30"),
      imageURL: "https://www.benadryl.com.ph/sites/benadryl_ph/files/styles/product_image/public/product-images/benadrylone_sidetablet.png",
      codebar: 543210987,
    },
    {
      category: "Digestive Health",
      productName: "Pepto-Bismol",
      price: 7.99,
      stock: 60,
      description: "Relieves upset stomach and indigestion",
      manufacturer: "Procter & Gamble",
      activeIngredients: "Bismuth subsalicylate",
      dosageForm: "Liquid",
      strength: "525 mg/15 mL",
      packaging: "Bottle",
      expiryDate: new Date("2023-11-15"),
      imageURL: "https://images.squarespace-cdn.com/content/v1/56cdff5a1bbee0e1a2120339/1489549717061-H63VJVPKVKDQG7TAOMXM/tumblr_inline_nk51r5Whzt1sn6scg.png?format=1000w",
      codebar: 135792468,
    },
    {
      category: "Vitamins and Supplements",
      productName: "Multivitamin",
      price: 9.99,
      stock: 80,
      description: "Supports overall health and well-being",
      manufacturer: "Nature's Way",
      activeIngredients: "Various vitamins and minerals",
      dosageForm: "Capsule",
      strength: "N/A",
      packaging: "Bottle",
      expiryDate: new Date("2023-12-31"),
      imageURL: "https://w7.pngwing.com/pngs/530/141/png-transparent-dietary-supplement-vitamin-c-tablet-multivitamin-vitamine-dietary-supplement-tablet-vitamin-c.png",
      codebar: 246813579,
    },
  ];

  const dummyRecords = [
    {
      type: "Medical Report",
      file: "medical_report_1.pdf",
      name: "John Doe",
    },
    {
      type: "Prescription",
      file: "prescription_1.jpg",
      name: "Alice Smith",
    },
    {
      type: "Medical Report",
      file: "medical_report_2.pdf",
      name: "Bob Johnson",
    },
    {
      type: "Prescription",
      file: "prescription_2.jpg",
      name: "Emma Davis",
    },
    {
      type: "Medical Report",
      file: "medical_report_3.pdf",
      name: "Michael Brown",
    },
  ];

  const dummyReviews = [
    {
      review: "Great product, I love it!",
      rating: 5,
    },
    {
      review: "Good quality, worth the price.",
      rating: 4,
    },
    {
      review: "Average product, could be better.",
      rating: 3,
    },
    {
      review: "Not satisfied with the purchase.",
      rating: 2,
    },
    {
      review: "Terrible product, a complete waste of money.",
      rating: 1,
    },
  ];

  const dummyUsers = [
    {
      username: "john_doe",
      email: "john.doe@example.com",
      password: "hashed_password_1",
      type: "user",
      imgUrl: "https://example.com/john_doe.jpg",
    },
    {
      username: "alice_jones",
      email: "alice.jones@example.com",
      password: "hashed_password_2",
      type: "user",
      imgUrl: "https://example.com/alice_jones.jpg",
    },
    {
      username: "susan_smith",
      email: "susan.smith@example.com",
      password: "hashed_password_3",
      type: "user",
      imgUrl: "https://example.com/susan_smith.jpg",
    },
    {
      username: "mark_wilson",
      email: "mark.wilson@example.com",
      password: "hashed_password_4",
      type: "user",
      imgUrl: "https://example.com/mark_wilson.jpg",
    },
  ];

  const dummyMedicineCategories = [
    {
      name: "Pain Relief",
      description: "Category for medications that relieve pain and reduce fever.",
    },
    {
      name: "Antibiotics",
      description: "Category for medications that treat bacterial infections.",
    },
    {
      name: "Allergy and Sinus",
      description: "Category for medications that relieve allergy symptoms and sinus issues.",
    },
    {
      name: "Digestive Health",
      description: "Category for medications that support digestive health and relieve digestive issues.",
    },
    {
      name: "Vitamins and Supplements",
      description: "Category for various vitamins and dietary supplements.",
    },
  ];

  const dummyAvailabilityData = [
    {
      hour: "09:00 AM",
      availability: true,
    },
    {
      hour: "10:00 AM",
      availability: false,
    },
    {
      hour: "11:00 AM",
      availability: true,
    },
    {
      hour: "01:00 PM",
      availability: false,
    },
    {
      hour: "02:00 PM",
      availability: true,
    },
  ];

  const dummyDoctors = [
    {
      fullname: "Dr. John Smith",
      type: "doctor",
      age: 35,
      lang: 36.78,
      lat: 10.45,
      isBlocked: false,
      yx: "ABC123",
      isverified: true,
    },
    {
      fullname: "Dr. Alice Johnson",
      type: "doctor",
      age: 40,
      lang: 34.56,
      lat: 11.23,
      isBlocked: false,
      yx: "DEF456",
      isverified: true,
    },
    {
      fullname: "Dr. Sarah Miller",
      type: "doctor",
      age: 38,
      lang: 35.67,
      lat: 9.87,
      isBlocked: true,
      yx: "GHI789",
      isverified: false,
    },
    {
      fullname: "Dr. Robert Davis",
      type: "doctor",
      age: 45,
      lang: 33.98,
      lat: 12.34,
      isBlocked: true,
      yx: "JKL012",
      isverified: false,
    },
    {
      fullname: "Dr. Emily White",
      type: "doctor",
      age: 42,
      lang: 37.12,
      lat: 10.89,
      isBlocked: false,
      yx: "MNO345",
      isverified: true,
    },
  ];

  const dummySpecialities = [
    { name: "Generalist" },
    { name: "Cardiologist" },
    { name: "Dermatologist" },
    { name: "Orthopedic Surgeon" },
    { name: "Gastroenterologist" },
  ];
  
  module.exports = {dummyPharmacies, dummyOrders, dummyProducts, dummyRecords, dummyReviews, dummyUsers, dummyMedicineCategories, dummyAvailabilityData, dummyDoctors, dummySpecialities  };

  
  User.bulkCreate(dummyUsers)
    .then(() => {
      console.log('User data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });

    
  Order.bulkCreate(dummyOrders)
    .then(() => {
      console.log('Order data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });


  Pharmacy.bulkCreate(dummyPharmacies)
    .then(() => {
      console.log('Pharmacy data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });


  Products.bulkCreate(dummyProducts)
    .then(() => {
      console.log('Product data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });


    Record.bulkCreate(dummyRecords)
    .then(() => {
      console.log('Records data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });

    
  Review.bulkCreate(dummyReviews)
    .then(() => {
      console.log('Review data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });

  Categories.bulkCreate(dummyMedicineCategories)
    .then(() => {
      console.log('categories data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });

  Availability.bulkCreate(dummyAvailabilityData)
    .then(() => {
      console.log('availability data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });

  Doctor.bulkCreate(dummyDoctors)
    .then(() => {
      console.log('Doctors data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });

  Speciality.bulkCreate(dummySpecialities)
    .then(() => {
      console.log('Specialties data created successfully.');
    })
    .catch((error) => {
      console.error('Error creating dummy data:', error);
    });
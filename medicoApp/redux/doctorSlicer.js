import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  oneDoc:{},
  idDoc:0,
  idDocMap:0,
  idPharmaMap:0,
  idAppoint:0,
  userInfo:{},
  error: null,
  loading: false,
};




export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (email) => {
  const response = await axios.get(
    `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/getAll/${email}`
  ); 
  return response.data;
});


export const addDoctor = createAsyncThunk(
  "addDoctor",
  async (input, { dispatch }) => {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/addDoc`,
      input
    );
    dispatch(fetchDoctors());
    return response.data;
  }
);

const deleteDoctor = createAsyncThunk(
  "api/deleteDoctor",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/deleteDoc/:${id}`
    );
    dispatch(fetchDoctors());
    return response.data;
  }
);

export const updateDoctor = createAsyncThunk(
  "api/updateDoctor",
  async (id, input, { dispatch }) => {
    const response = await axios.delete(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateDoc/:${id}`,
      input
    );
    dispatch(fetchDoctors());
    return response.data;
  }
);
export const migrateDoctor = createAsyncThunk(
  "api/migrateDoctor",
  async (input) => {
    const doc = await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor//migrationDoctor`,
      input
    );
    return doc.data;
  }
);
export const updateLocation = createAsyncThunk(
  "api/updateLocation" , 
  async(input)=>{
    const responce = await axios.patch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateLocation` , 
    input
    )
    return responce.data
  }
  )
  export const updateSpeciality = createAsyncThunk(
    "api/updateSpeciality",
    async(input)=>{
      const responce = await axios.patch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateSpeciality`,
      input
      )
      return responce.data
    }
  )
  export const updateRecords = createAsyncThunk(
    "api/updateRecords",
    async(input)=>{
      const responce = await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateRecords`,
      input
      )
      return responce.data
    }
  )

  export const fetchDoctorData = createAsyncThunk ('api/fetchdetails',
  async(email)=>{
    const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/getOneDoc/${email}`)
    return response.data
  }
  )
  export const docImage = createAsyncThunk(
    "api/updateImage",
    async(input)=>{
      const responce = await axios.patch(`http://${process.env.EXPO_PUBLIC_}:1128/api/doctor/updateImage` , 
      input
    )
    return responce.data
    }  
  )
  // export const updatateImgUrlDoc = createAsyncThunk(
  //   'api/updateImage',
  //   async(input)=>{
  //     const responce = await  axios.patch(`http://${process.env.EXPO_PUBLIC_}:1128/api/doctor/updateImage` ,
  //     input
  //     )
  //     return responce.data
  //   }
  // )


const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    save:(state,action)=>{
      state.idDoc=action.payload
    },
    saveMap:(state,action)=>{
      state.userInfo=action.payload
    },
    idMap:(state,action)=>{
      state.idDocMap=action.payload
    },
    idMapPharma:(state,action)=>{
      state.idPharmaMap=action.payload
    },
    idAppointement:(state,action)=>{
      state.idAppoint=action.payload
    },
    logOut:(state)=>{
       state.oneDoc={} 
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(migrateDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(docImage.fulfilled, (state, action) => {
      state.data = action.payload;
    });
   
    builder.addCase(fetchDoctorData.fulfilled, (state, action) => {
      state.oneDoc = action.payload;
    });
    // builder.addCase(updateRecords.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
  },
});
export const {save,idMap,idMapPharma,idAppointement}= DoctorSlice.actions;
export const {saveMap}= DoctorSlice.actions;
export default DoctorSlice.reducer;
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


//asyncThunk to fetch news 
export const fetchNews = createAsyncThunk('news/fetchNews', async(_, thunkAPI)=>{
    const state = thunkAPI.getState().news //get current reduy state
    try{
        const response = await axios.get(`${BASE_URL}/search?q=${state.search || 'latest'}&lang=en&country${state.country}&max=15&apikey=${API_KEY}`)
        return response.data.articles

    }catch(error){
        return thunkAPI.rejectWithValue('Failed to fetch news')
    }
})

// Vite server issue 

const newsSlice = createSlice({
    name:'news',
    initialState:{
        articles:[],    // all fetch articeles 
        headlines: [],  // top 5 headlines
        search: '',     // search terms
        country: 'us',  // selected country
        loading: false,  // loading state 
        error: null   
        },
    reducers:{
        setSearch:(state, action)=>{
            state.search = action.payload;
        },
        setCountry:(state, action)=>{
            state.country= action.payload 
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNews.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchNews.fulfilled, (state,action)=>{
            state.loading = false ;
            state.articles = action.payload;
            state.headlines = action.payload.slice(0.5);
        }).addCase(fetchNews.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }

})

export const{setCountry, setSearch} = newsSlice.actions;

export default newsSlice.reducer 
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts' /* название запроса */, async () => {
  const { data } = await axios.get('/posts'); /* забираю дата из запроса,там данные хранятся */
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags' /* название запроса */, async () => {
  const { data } = await axios.get('/tags'); /* забираю дата из запроса,там данные хранятся */
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {} /* локальная работа с данными */,
  extraReducers: {
    /* async работа */
    /* получение статей */
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    /* получение тэгов */
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    /* удаление поста */
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg,
      ); /* во время пендинга айдишник статьи хранится в мета.арг, его фильтром забрал */
    },
  },
});

export const postsReducer = postSlice.reducer;

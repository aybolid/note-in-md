import { MyAllNotesResponse } from '@/types/notes';
import local from '@/utils/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export const getUserNotes = createAsyncThunk<
  MyAllNotesResponse,
  undefined,
  { rejectValue: string }
>('notes/getUserNotes', async (_, { rejectWithValue }) => {
  try {
    const token = local.get<string>('access-token');
    if (!token) throw new Error('No token found');

    const response: AxiosResponse<MyAllNotesResponse> = await axios.get(
      '/api/notes/get-my',
      {
        headers: { Authorization: `Bearer: ${token}` },
      }
    );

    return response.data;
  } catch (err) {
    return rejectWithValue('Error while getting your notes...');
  }
});

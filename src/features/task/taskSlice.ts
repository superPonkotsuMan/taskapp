import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';


export interface TaskState {
  //taskが何個あるか管理
  idCount: number;
  //storeに保存するtaskの一覧
  tasks:{id:number; title:string; completed: boolean}[];
  // taskのtitleを編集する際にどのtaskが選択されているか
  selectedTask:{id:number; title:string; completed: boolean};
  // Modalを開くか閉じるかのフラグ
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks:[{id:1, title: 'Task A', completed: false}],
  selectedTask:{id:0, title:'', completed: false},
  isModalOpen: false,
};



export const taskSlice = createSlice({
  name: 'task',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //taskの作成
    createTask:(state, action)=>{
      state.idCount++;
      const newTask={
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      //スプレッド構文
      state.tasks=[newTask, ...state.tasks];
    },
  },
});

export const { createTask} = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTask = (state: RootState): TaskState['tasks'] => state.task.tasks;


export default taskSlice.reducer;

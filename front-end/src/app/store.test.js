import configureStore from 'redux-mock-store';
import rootReducer from './store';
import userReducer, {
  initialState as userState,
} from '../features/users/usersSlice';
import todosReducer, {
  initialState as todosState,
} from '../features/todos/todosSlice';

const initialState = {
  todos: todosState,
  user: userState,
};
const storeState = rootReducer.getState();
const mockStore = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});

describe('Store Test Suite', () => {
  it('Should return the initial state', () => {
    expect(storeState).not.toBeNull();
    expect(storeState).toEqual(initialState);
  });
});

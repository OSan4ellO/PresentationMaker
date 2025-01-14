// store/hooks.ts
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store'; // Импортируем RootState и AppDispatch

// Создаем типизированный useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Создаем типизированный useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
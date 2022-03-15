import { TSState } from './../redux/transportation/transportation.reducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<TSState> = useSelector

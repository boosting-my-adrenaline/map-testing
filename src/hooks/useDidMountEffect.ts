import { useEffect, EffectCallback, DependencyList, useRef } from 'react'

export const useDidMountEffect = (
  func: EffectCallback | any,
  deps?: DependencyList
) => {
  const initialRender = useRef(true)

  useEffect(() => {
    let effectReturns: void | (() => void | undefined) = () => {}

    if (initialRender.current) {
      initialRender.current = false
    } else {
      effectReturns = func()
    }

    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns
    }
  }, deps)
}

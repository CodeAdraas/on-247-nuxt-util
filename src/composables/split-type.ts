import {
    type SplitTypeOptions,
    SplitTypeAbstraction
} from '../lib/split-type'


export const useSplitType = (options: SplitTypeOptions) => {
    return new SplitTypeAbstraction(options)
}
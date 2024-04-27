export interface TodoProps {
    id: number
    title: string
    completed: boolean
    onRemove?: (id: number) => void
    onChanged?: (id: number, title: string) => void
    onCompleted?: (id: number, state: boolean) => void

    [x: string]: any
}
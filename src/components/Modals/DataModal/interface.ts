export interface ModalProps {
    openModal:boolean,
    onClose:()=>void
    mode:string
    rowData?:any
}
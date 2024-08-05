export interface CloseButtonModel {
    onClickClose: () => void;
}

export interface DeleteButtonModel {
    dataID?: string;
    onClickDelete: () => void;
}

export interface EditButtonModel {
    dataID?: string;
    onClickEdit: () => void;
}

export interface OptionsButtonModel {
    children: any;
    onClick: () => void;
}

export interface SubmitButtonModel {
    display: any;
    onClickSubmit: () => void;
}

export interface SwitchButtonModal {
    display: any;
}

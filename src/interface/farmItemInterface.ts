export interface ITokenFilterItem {
    filterName: string;
    isSelected: boolean;
    iconName?: string;
}

export interface IChainFilterItem {
    filterName: string;
    isSelected: boolean;
    iconName?: string;
    isDisabled?: boolean;
}

export const inputStyles = 'py-[15px] px-[6px] rounded-lg border-[1px] border-[#CFD3D4] w-full';
export const colors: BgColors = {
	blue: '#24B6EB',
	danger: '#EA1313',
	dark: '#232731',
	default: '#999999',
	green: '#49D65A',
	light: '#EDEEEF',
	orange: '#FF8300',
	yellow: '#FFFF1'
};
export const bgColors: BgColors = {
	blue: 'bg-[#24B6EB]',
	danger: 'bg-[#EA1313]',
	dark: 'bg-[#232731]',
	default: 'bg-[#999999]',
	green: 'bg-[#49D65A]',
	light: 'bg-[#EDEEEF]',
	orange: 'bg-[#FF8300]',
	yellow: 'bg-[#FFFF1]'
};
export const sizes: { xs: string; sm: string; md: string } = {
	xs: 'h-[18px] p-[1px] text-[12px]',
	// sm: 'h-[30px] p-[5px] text-[15px]',
	sm: 'h-[35px] p-[5px] text-[15px]',
	md: 'h-[44px] p-[10px] text-[20px]'
};

export const buttonStyles = `flex justify-left items-left w-full rounded-l
font-normal leading-normal text-white ${sizes.xs}`; //shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
export const disableButtonStyles = `${bgColors.default} cursor-default`;
export const ratingColor = (value: number) =>
	['#D9D9D9', '#EA1313', '#F44B0A', '#FF8300', '#A4AD2D', '#49D65A'][value];

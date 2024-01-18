type GradientBorderButtonProps = {
    btnText: string;
    disabled?: boolean;
    smallSize?: boolean;
    className?: string;
    onClick?: () => void;
  };
  
  export const GradientBorderButton = ({
    btnText,
    disabled = false,
    smallSize = false,
    onClick,
  }: GradientBorderButtonProps) => {
    const onBtnClick = () => {
      if (!disabled) {
        !!onClick && onClick();
      }
    };
  
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden font-semibold rounded-full ${
          !disabled && "cursor-pointer"
        } ${smallSize ? "text-sm h-9" : "h-10"}`}
        onClick={onBtnClick}
      >
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 ${
            disabled ? "bg-gray-300 dark:bg-gray-800" : "bg-gradient-to-r from-gradFrom to-gradTo"
          }`}
        ></div>
        <div
          className={`box-border z-10 flex items-center justify-center h-full border-2 border-transparent rounded-full bg-clip-padding bg-light select-none dark:bg-dark ${
            !disabled ? "dark:text-white" : "text-gray-300 dark:text-gray-600"
          } ${smallSize ? "px-4" : "px-8"}`}
        >
          {btnText}
        </div>
      </div>
    );
  };
  
import React, { useRef } from "react";
import classes from "./InputNumber.module.css";

const InputNumber = ({
                         value,
                         valueChange,
                         step,
                         maxRange = 40,
                         disabled = false,
                         text = "Z:",
                     }) => {
    const sliderRef = useRef(null);
    const thumbRef = useRef(null);

    const handleSliderClick = (e) => {
        const rect = sliderRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top; // Получаем позицию клика относительно верхней границы ползунка
        const newValue =
            ((y / rect.height) * (maxRange * 2 * step) - maxRange * step) * -1; // Преобразуем позицию в значение

        // Ограничиваем значение в пределах диапазона
        const clampedValue = Math.min(Math.max(-maxRange * step, newValue), maxRange * step);
        valueChange(clampedValue);
    };

    const handleMouseMove = (e) => {
        if (e.buttons === 1) { // Проверяем, что кнопка мыши нажата
            handleSliderClick(e);
        }
    };

    return (
        <div className={classes.body}>
            <div className={classes.text}>{text}</div>
            <div className={classes.inputContainer}>
                <input
                    type="number"
                    step={step}
                    value={value}
                    onChange={(e) => valueChange(Number(e.target.value))}
                    disabled={disabled}
                    className={classes.number}
                />
                <div
                    className={classes.customRange}
                    ref={sliderRef}
                    onClick={handleSliderClick}
                    onMouseMove={handleMouseMove} // Добавляем обработчик перемещения мыши
                >
                    <div
                        className={classes.thumb}
                        ref={thumbRef}
                        style={{
                            bottom: `${((value + maxRange * step) / (maxRange * 2 * step)) * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputNumber;
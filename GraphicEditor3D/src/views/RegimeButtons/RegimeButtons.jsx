import React, { useState, useEffect, useRef } from "react";
import regimes from "../../constants/regimes";
import convertToText from "../../functions/convertToText";
import downloadFile from "../../functions/downloadFile";
import readFile from "../../functions/readFile";
import convertFromText from "../../functions/convertFromText";
import classes from "./RegimeButtons.module.css";

/** Кнопки с режимами работы */
const RegimeButtons = ({
                         regime,
                         regimeChange,
                         points,
                         pointsChange,
                         sticks,
                         sticksChange,
                         reset,
                       }) => {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isTransformationOpen, setIsTransformationOpen] = useState(false);

  const menuRef = useRef(null); // Ссылка на меню для проверки кликов вне области

  // Функция для закрытия всех выпадающих списков
  const closeAllDropdowns = () => {
    setIsProjectOpen(false);
    setIsEditorOpen(false);
    setIsTransformationOpen(false);
  };

  // Обработчик клика вне области меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Функция для открытия одного выпадающего списка и закрытия остальных
  const toggleDropdown = (dropdown) => {
    closeAllDropdowns(); // Сначала закрываем все выпадающие списки
    if (dropdown === "project") {
      setIsProjectOpen(true);
    } else if (dropdown === "editor") {
      setIsEditorOpen(true);
    } else if (dropdown === "transformation") {
      setIsTransformationOpen(true);
    }
  };

  const projectActions = [
    {
      title: "Сохранить",
      onClick: () => {
        const text = convertToText(points, sticks);
        downloadFile(text, "model.txt");
      },
    },
    {
      title: "Загрузить",
      onClick: () => {
        readFile((t, n) => {
          const [p, s] = convertFromText(t);
          pointsChange(p);
          sticksChange(s);
        });
      },
    },
    {
      title: "Вращать сцену",
      onClick: () => regimeChange(regimes.totalRotation),
    },
    {
      title: "Очистить",
      onClick: () => reset(),
    },
  ];

  const editorActions = [
    {
      title: "Добавить точку",
      onClick: () => regimeChange(regimes.addPoint),
    },
    {
      title: "Добавить линию",
      onClick: () => regimeChange(regimes.addStick),
    },
    {
      title: "Удалить элемент",
      onClick: () => regimeChange(regimes.delete),
    },
    {
      title: "Группировать",
      onClick: () => regimeChange(regimes.group),
    },
  ];

  const transformationActions = [
    {
      title: "Перемещение группы",
      onClick: () => regimeChange(regimes.groupMoving),
    },
    {
      title: "Вращение группы",
      onClick: () => regimeChange(regimes.groupRotation),
    },
    {
      title: "Зеркалирование группы",
      onClick: () => regimeChange(regimes.groupMirror),
    },
    {
      title: "Масштабирование группы",
      onClick: () => regimeChange(regimes.groupScale),
    },
  ];

  return (
      <div className={classes.menu} ref={menuRef}>
        <div
            className={classes.menuItem}
            onClick={() => toggleDropdown("project")}
        >
          Проект
          {isProjectOpen && (
              <div className={classes.dropdown}>
                {projectActions.map((action, index) => (
                    <div
                        key={index}
                        className={classes.dropdownItem}
                        onClick={action.onClick}
                    >
                      {action.title}
                    </div>
                ))}
              </div>
          )}
        </div>
        <div
            className={classes.menuItem}
            onClick={() => toggleDropdown("editor")}
        >
          Редактор
          {isEditorOpen && (
              <div className={classes.dropdown}>
                {editorActions.map((action, index) => (
                    <div
                        key={index}
                        className={classes.dropdownItem}
                        onClick={action.onClick}
                    >
                      {action.title}
                    </div>
                ))}
              </div>
          )}
        </div>
        <div
            className={classes.menuItem}
            onClick={() => toggleDropdown("transformation")}
        >
          Трансформация
          {isTransformationOpen && (
              <div className={classes.dropdown}>
                {transformationActions.map((action, index) => (
                    <div
                        key={index}
                        className={classes.dropdownItem}
                        onClick={action.onClick}
                    >
                      {action.title}
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default RegimeButtons;
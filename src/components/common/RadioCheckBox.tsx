import { css } from '@styled-system/css';
import React from 'react';

function CheckBox({ children }: { children: React.ReactNode }) {
  return (
    <input
      type="radio"
      className={css({
        WebkitAppearance: 'none',
        appearance: 'none',
        width: '13px',
        height: '13px',
        border: '1px solid #ccc',
        borderRadius: '50%',
        outline: 'none',
        cursor: 'pointer',
        _checked: {
          backgroundColor: '#111', // 체크 시 내부 원 색상
          border: '3px solid #fff', // 라인과 원 사이 색상
          boxShadow: '0 0 0 1px #111', // 라인 색상
        },
      })}
    >
      {children}
    </input>
  );
}

export default CheckBox;

import React from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';

interface TableActionButtonProps {
  title: string;
  ariaLabel?: string;
  onClick?: () => void;
  href?: string;
}

const VIEW_CLASS =
  'p-1.5 rounded border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer inline-flex items-center justify-center';
const EDIT_CLASS =
  'p-1.5 rounded border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer inline-flex items-center justify-center';
const DELETE_CLASS =
  'p-1.5 rounded border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer inline-flex items-center justify-center';

export const TableViewActionButton: React.FC<TableActionButtonProps> = ({
  title,
  ariaLabel,
  onClick,
  href,
}) => {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        aria-label={ariaLabel || title}
        className={VIEW_CLASS}
      >
        <Eye className="w-3.5 h-3.5" />
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title}
      className={VIEW_CLASS}
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
  );
};

export const TableEditActionButton: React.FC<TableActionButtonProps> = ({
  title,
  ariaLabel,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={ariaLabel || title}
    className={EDIT_CLASS}
  >
    <Edit2 className="w-3.5 h-3.5" />
  </button>
);

export const TableDeleteActionButton: React.FC<TableActionButtonProps> = ({
  title,
  ariaLabel,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={ariaLabel || title}
    className={DELETE_CLASS}
  >
    <Trash2 className="w-3.5 h-3.5" />
  </button>
);

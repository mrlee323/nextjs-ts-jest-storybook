import React from "react";

interface CardProps {
  title: string;
  content: string;
  imageUrl?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, imageUrl, onClick }) => {
  return (
    <div
      className={`w-full sm:w-[400px] lg:w-[500px] h-auto p-7 flex flex-col gap-4 rounded-lg shadow-lg shadow-gray-300 ${
        onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""
      }`}
      onClick={onClick}
    >
      {imageUrl && (
        <div className="card-image rounded-lg overflow-hidden max-h-[200px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="card-content flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
    </div>
  );
};

export default Card;

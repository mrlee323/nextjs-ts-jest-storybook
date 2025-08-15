import {
  AlertCircle,
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

interface AdvancedCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    date: string;
  };
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
  isLoading?: boolean;
  error?: string;
}

const AdvancedCard: React.FC<AdvancedCardProps> = ({
  title,
  content,
  imageUrl,
  tags,
  author,
  likes,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onShare,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div
        className="animate-pulse w-full max-w-md bg-white p-3"
        aria-label="로딩 중..."
      >
        {/* 헤더 스켈레톤 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        {/* 이미지 스켈레톤 */}
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>

        {/* 제목 스켈레톤 */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

        {/* 내용 스켈레톤 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* 태그 스켈레톤 */}
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-14"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* 에러 아이콘 */}
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          오류가 발생했습니다
        </h3>
        <p className="text-gray-600 text-center mb-4">{error}</p>

        {/* 재시도 버튼 */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full min-w-[300px] md:w-[400px] flex flex-col bg-white"
      aria-label={title}
    >
      {/* 작성자 정보 */}
      <div className="w-full flex items-center gap-3 p-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">{author.name}</span>
          <span className="text-xs text-gray-500">{author.date}</span>
        </div>
      </div>
      {/* 이미지 */}
      <div className="w-full h-auto min-h-[300px] flex flex-col justify-center bg-gray-200">
        {imageUrl ? (
          <div className="w-full h-auto min-h-[300px]">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
            <span className="text-gray-400">이미지 없음</span>
          </div>
        )}
      </div>
      {/* 좋아요 버튼 */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <ul className="flex gap-2 items-center">
          <li className="flex items-center gap-1">
            <button onClick={onLike} type="button" aria-label="좋아요">
              <Heart
                className={`w-5 h-5 cursor-pointer transition-colors ${
                  isLiked
                    ? "text-red-500 fill-current"
                    : "text-gray-400 hover:text-red-300"
                }`}
              />
            </button>
            <span className="text-sm text-gray-500">{likes}</span>
          </li>
          <li className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            <span className="text-sm text-gray-500">200</span>
          </li>

          <li className="flex items-center gap-1">
            <button onClick={onShare} type="button" aria-label="공유">
              <Share2 className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </button>
          </li>
        </ul>
        <button onClick={onBookmark} type="button" aria-label="북마크">
          <Bookmark
            className={`w-5 h-5 cursor-pointer transition-colors ${
              isBookmarked
                ? "text-blue-500 fill-current"
                : "text-gray-400 hover:text-blue-300"
            }`}
          />
        </button>
      </div>
      {/* 컨텐츠 */}
      <div className="flex flex-col gap-2 p-3">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-sm text-gray-500">{content}</div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedCard;

import type { ToolboxItem } from '@/types/frontend.types';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export const ToolboxItems = ({
  items,
  className,
  itemsWrapperClassname,
}: {
  className?: string;
  itemsWrapperClassname?: string;
  items: ToolboxItem[];
}) => {
  return (
    <div
      className={twMerge(
        'flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div className={twMerge('flex flex-none py-0.5 gap-6 pr-6', itemsWrapperClassname)}>
        {items.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center gap-4 py-2 px-3 outline outline-2 outline-white/10 rounded-lg"
          >
            <Image src={item.iconUrl} alt={item.title} width={24} height={24} className="w-6 h-6" />
            <span className="font-semibold">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

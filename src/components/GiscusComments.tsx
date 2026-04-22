'use client';

import Giscus from '@giscus/react';

export const GiscusComments = () => {
  return (
    <div className="mt-16 pt-8 border-t border-gray-800">
      <Giscus
        repo="rizkinabil/nextjs-rizkinabil"
        repoId="R_kgDONQ9TQw"
        category="Announcements"
        categoryId="DIC_kwDONQ9TQ84C0hl9"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

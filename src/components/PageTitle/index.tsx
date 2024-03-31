import { memo, useEffect } from 'react';

const PageTitle = memo<{ title: string }>(({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} · UFO·SB` : 'UFO·SB';
  }, [title]);

  return null;
});

export default PageTitle;

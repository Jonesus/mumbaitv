import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { BackWrapper, BackButton } from 'src/components/Simple';
import { useRouter } from 'next/router';
import { useGlobalState } from 'src/pages/_app';

export const Back: React.FC = () => {
  const { push, back } = useRouter();
  const [clips] = useGlobalState('clips');

  // If we have been to the main page then use 'back' function,
  // otherwise it would navigate us out of mumbaitv.online as it
  // hooks to browsers back functionality
  const onClick = clips.length !== 0 ? back : () => push('/');

  return (
    <BackWrapper>
      <BackButton title="Go back" onClick={onClick}>
        <FiArrowLeft />
      </BackButton>
    </BackWrapper>
  );
};

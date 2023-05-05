'use client';

import React, { useEffect } from 'react';

import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/Logo';
import { SlideIn } from '@/components/SlideIn';

import { LoginForm } from './LoginForm';

export default function PageLogin() {
  const { t } = useTranslation(['auth']);
  const router = useRouter();

  const queryCache = useQueryClient();
  const onLogin = () => {
    queryCache.clear();
    router.replace('/'); // TODO redirect with url params (useRedirectFromUrl)
  };

  return (
    <SlideIn>
      <Box px="2" py="4rem" w="22rem" maxW="full" m="auto">
        <Logo h="3rem" mb="8" mx="auto" />
        <Box
          p="6"
          borderRadius="md"
          boxShadow="md"
          bg="white"
          _dark={{ bg: 'blackAlpha.400' }}
        >
          <Heading size="md" mb="4" data-test="login-page-heading">
            {t('auth:login.title')}
          </Heading>
          <LoginForm onSuccess={onLogin} />
        </Box>
        <Center mt="8">
          <Button onClick={() => router.replace('/')}>Go to /</Button>
          <Link href="/">Go to / link</Link>
          <Button as={Link} href="/account/register" variant="link">
            {t('auth:login.actions.needAccount')}{' '}
            <Box
              as="strong"
              ms="2"
              color="gray.600"
              _dark={{ color: 'gray.300' }}
            >
              {t('auth:login.actions.register')}
            </Box>
          </Button>
        </Center>
      </Box>
    </SlideIn>
  );
}

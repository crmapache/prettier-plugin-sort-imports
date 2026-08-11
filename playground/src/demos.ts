export type PresetId =
  | 'react'
  | 'next'
  | 'vue'
  | 'nuxt'
  | 'nest'
  | 'node'
  | 'svelte'
  | 'angular'
  | 'vanilla'

export interface Demo {
  id: PresetId
  label: string
  /** Preset sent to the plugin; `vanilla` has no framework defaults of its own. */
  preset: string
  parser: string
  /**
   * Absolute on purpose: the plugin resolves aliases from the directory of the
   * file it is formatting, and this path exists nowhere on the server, so a demo
   * can never pick up a tsconfig that happens to sit near the API process.
   */
  filepath: string
  /** Bundler aliases the demo relies on, passed through `sortImportsAliases`. */
  aliases: string[]
  description: string
  tags: string[]
  code: string
}

export const DEMOS: Demo[] = [
  {
    id: 'react',
    label: 'React',
    preset: 'react',
    parser: 'babel',
    filepath: '/playground/src/components/UserProfile.tsx',
    aliases: ['@/'],
    description: 'React core first, then packages, scoped SDKs, path aliases and relative files.',
    tags: ['TSX', 'Hooks', 'Aliases'],
    code: `import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, Tooltip } from '@/components/ui'
import axios from 'axios'
import { Header } from '../layout/Header'
import { useAuth } from '@company/auth-sdk'
import { formatRelativeTime } from '@/utils/date'
import type { UserProfileProps } from './types'
import { Button } from '@/components/ui/button'
import { ErrorBoundary } from '../common/ErrorBoundary'
import * as LucideIcons from 'lucide-react'
import { API_ENDPOINT } from '../../constants/config'
import './UserProfile.css'

export function UserProfile({ userId }) {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  return <div className="user-profile">...</div>
}
`,
  },
  {
    id: 'next',
    label: 'Next.js',
    preset: 'next',
    parser: 'babel',
    filepath: '/playground/app/dashboard/page.tsx',
    aliases: ['@/', '@utils/'],
    description: 'Next builtin modules pinned to the top, then everything else.',
    tags: ['App Router', 'RSC'],
    code: `import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { StatCard } from '@/components/dashboard/StatCard'
import { fetchAnalyticsData } from '@/lib/api/analytics'
import { useAuthSession } from '@company/next-auth'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@utils/currency'
import { Suspense } from 'react'
import { Sidebar } from '../../components/Sidebar'
import './dashboard.module.css'
`,
  },
  {
    id: 'vue',
    label: 'Vue 3',
    preset: 'vue',
    parser: 'typescript',
    filepath: '/playground/src/views/DashboardView.vue.ts',
    aliases: ['@/'],
    description: 'Vue, Router and Pinia first, then aliases and .vue components.',
    tags: ['SFC', 'Pinia'],
    code: `import { ref, computed, onMounted } from 'vue'
import UserCard from '../components/UserCard.vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { formatDate } from '@company/date-utils'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import { storeToRefs } from 'pinia'
import { APP_TITLE } from '../../constants'
import './DashboardView.css'
`,
  },
  {
    id: 'nuxt',
    label: 'Nuxt 3',
    preset: 'nuxt',
    parser: 'typescript',
    filepath: '/playground/pages/users/detail.vue.ts',
    aliases: ['@/', '~/'],
    description: 'Handles #imports, composables and ~/ auto-import aliases.',
    tags: ['#imports', 'Nitro'],
    code: `import { definePageMeta, useHead, useAsyncData } from '#imports'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiClient } from '~/lib/api/client'
import { formatTitle } from '@company/utils/title'
import UserAvatar from '~/components/UserAvatar.vue'
import type { UserDetail } from '~/types/user'
import '~/assets/css/user-detail.css'
`,
  },
  {
    id: 'nest',
    label: 'NestJS',
    preset: 'nest',
    parser: 'typescript',
    filepath: '/playground/src/users/users.controller.ts',
    aliases: ['@core/'],
    description: 'reflect-metadata stays on line one; @nestjs packages lead the group.',
    tags: ['Decorators', 'Backend'],
    code: `import 'reflect-metadata'
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { AuthGuard } from '@core/guards/auth.guard'
import { ConfigService } from '@nestjs/config'
import { CreateUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { Roles } from '../common/decorators/roles.decorator'
`,
  },
  {
    id: 'node',
    label: 'Node.js',
    preset: 'node',
    parser: 'typescript',
    filepath: '/playground/src/server.ts',
    aliases: ['@/'],
    description: 'Node built-ins first, then Express and application routes.',
    tags: ['Builtins', 'Express'],
    code: `import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { logger } from './utils/logger'
import { config } from '../config'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth'
import * as crypto from 'crypto'
import { db } from '@/database/client'
import type { Request, Response } from 'express'
`,
  },
  {
    id: 'svelte',
    label: 'Svelte',
    preset: 'svelte',
    parser: 'typescript',
    filepath: '/playground/src/routes/ProfileCard.svelte.ts',
    aliases: ['$lib/'],
    description: 'Svelte primitives, stores and transitions ahead of $lib modules.',
    tags: ['Stores', '$lib'],
    code: `import { onMount, createEventDispatcher } from 'svelte'
import Avatar from '$lib/components/Avatar.svelte'
import { writable } from 'svelte/store'
import { fetchUserProfile } from '$lib/api/users'
import { fade, slide } from 'svelte/transition'
import { userSession } from '$lib/stores/session'
import type { UserProfile } from '$lib/types'
import './ProfileCard.css'
`,
  },
  {
    id: 'angular',
    label: 'Angular',
    preset: 'angular',
    parser: 'typescript',
    filepath: '/playground/src/app/user.component.ts',
    aliases: [],
    description: '@angular/core and RxJS lead, services and feature modules follow.',
    tags: ['RxJS', 'DI'],
    code: `import 'zone.js'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { UserService } from './user.service'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, map, catchError } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCardComponent } from './components/user-card.component'
import type { User } from './user.model'
`,
  },
  {
    id: 'vanilla',
    label: 'Vanilla JS',
    preset: 'none',
    parser: 'babel',
    filepath: '/playground/src/main.js',
    aliases: [],
    description: 'Plain ESM: packages, aliases, relative modules and stylesheets.',
    tags: ['ESM', 'Styles'],
    code: `import _ from 'lodash'
import { helper } from './helpers/dom'
import axios from 'axios'
import { initApp } from '../lib/bootstrap'
import { APP_VERSION, ENV } from './constants'
import confetti from 'canvas-confetti'
import * as utils from './utils/math'
import './styles/main.css'
`,
  },
]

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

// Base pulse skeleton
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  );
}

// Card skeleton
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-white rounded-2xl p-5 shadow-sm', className)}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
}

// Lesson card skeleton
export function LessonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <Skeleton className="h-32 rounded-xl mb-4 w-full" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

// Dashboard stats skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
          <Skeleton className="w-10 h-10 rounded-xl mb-3" />
          <Skeleton className="h-7 w-16 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex gap-4">
        {[40, 30, 20].map((w, i) => (
          <Skeleton key={i} className={`h-4 w-${w || 20}`} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-5 py-4 border-b border-gray-50 flex items-center gap-4">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// Avatar skeleton
export function AvatarSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };
  return <Skeleton className={cn('rounded-full', sizes[size])} />;
}

// Badge skeleton
export function BadgeSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white shadow-sm">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

// Chat message skeleton
export function ChatMessageSkeleton({ align = 'left' }: { align?: 'left' | 'right' }) {
  return (
    <div className={cn('flex gap-2 mb-4', align === 'right' ? 'flex-row-reverse' : 'flex-row')}>
      {align === 'left' && <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />}
      <div className="space-y-2 max-w-xs">
        <Skeleton className="h-12 w-48 rounded-2xl" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

// Full dashboard loading skeleton
export function DashboardLoadingSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome banner */}
      <Skeleton className="h-28 rounded-3xl w-full" />
      {/* Stats */}
      <DashboardStatsSkeleton />
      {/* Two-column content */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <LessonCardSkeleton />
          <LessonCardSkeleton />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

interface MessageProps {
  message: string
  duration?: number
}

let count = 0

const target = <div class="fixed top-6 w-full flex flex-col items-center justify-center" /> as Node

function appendTo(el: Node, duration: number, removed = false) {
  if (count === 0)
    document.body.appendChild(target)

  ++count

  setTimeout(() => {
    --count
    !removed && target.removeChild(el)
    if (count === 0)
      document.body.removeChild(target)
  }, duration || 10000)

  target.appendChild(el)
}

function error({ message, duration = 40000 }: MessageProps) {
  let removed = false

  const el = (
    <div class="mb-3 ml-3 max-w-xs rounded-md bg-red-500 text-sm text-white shadow-lg" role="alert">
      <div class="flex p-4">
        {message}

        <div
          class="ml-6"
          onclick={() => {
            target.removeChild(el)
            removed = true
          }}
        >
          <button type="button" class="h-4 w-4 inline-flex flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.5] transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-red-800 dark:focus:ring-red-700 dark:focus:ring-offset-red-500">
            <span class="sr-only">Close</span>
            <svg class="h-3.5 w-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) as Node

  appendTo(el, duration, removed)
}

function warning({ message, duration = 40000 }: MessageProps) {
  let removed = false

  const el = (
    <div class="mb-3 ml-3 max-w-xs rounded-md bg-yellow-500 text-sm text-white shadow-lg" role="alert">
      <div class="flex p-4">
        {message}

        <div
          class="ml-6"
          onclick={() => {
            target.removeChild(el)
            removed = true
          }}
        >
          <button type="button" class="h-4 w-4 inline-flex flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.5] transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-800 dark:focus:ring-yellow-700 dark:focus:ring-offset-yellow-500">
            <span class="sr-only">Close</span>
            <svg class="h-3.5 w-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) as Node

  appendTo(el, duration, removed)
}

function success({ message, duration = 40000 }: MessageProps) {
  let removed = false

  const el = (
    <div class="mb-3 ml-3 max-w-xs rounded-md bg-green-500 text-sm text-white shadow-lg" role="alert">
      <div class="flex p-4">
        {message}

        <div
          class="ml-6"
          onclick={() => {
            target.removeChild(el)
            removed = true
          }}
        >
          <button type="button" class="h-4 w-4 inline-flex flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.5] transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-green-800 dark:focus:ring-green-700 dark:focus:ring-offset-green-500">
            <span class="sr-only">Close</span>
            <svg class="h-3.5 w-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) as Node

  appendTo(el, duration, removed)
}

function info({ message, duration = 40000 }: MessageProps) {
  let removed = false

  const el = (
    <div>
      <div class="mb-3 ml-3 max-w-xs rounded-md bg-blue-500 text-sm text-white shadow-lg" role="alert">
        <div class="flex p-4">
          {message}

          <div
            class="ml-6"
            onclick={() => {
              target.removeChild(el)
              removed = true
            }}
          >
            <button type="button" class="h-4 w-4 inline-flex flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.5] transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-800 dark:focus:ring-blue-700 dark:focus:ring-offset-blue-500">
              <span class="sr-only">Close</span>
              <svg class="h-3.5 w-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) as Node

  appendTo(el, duration, removed)
}

export const message = { error, success, info, warning }

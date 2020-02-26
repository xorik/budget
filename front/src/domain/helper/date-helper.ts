import dayjs from 'dayjs'

function currentProgress(start: string, end: string): number {
  const sinceStart = dayjs().unix() - dayjs(start).unix()
  const total = dayjs(end).unix() - dayjs(start).unix()

  return sinceStart / total
}

export { currentProgress }

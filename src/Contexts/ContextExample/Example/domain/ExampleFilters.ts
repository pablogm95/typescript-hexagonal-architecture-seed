import { ExampleTitle } from './ExampleTitle'
import { ExampleDate } from './ExampleDate'

export class ExampleFilters {
  title?: ExampleTitle
  startDate?: ExampleDate
  endDate?: ExampleDate

  constructor({ title, startDate, endDate }: { title?: ExampleTitle; startDate?: ExampleDate; endDate?: ExampleDate }) {
    this.title = title
    this.startDate = startDate
    this.endDate = endDate
  }

  static create({
    title,
    startDate,
    endDate,
  }: {
    title?: string
    startDate?: Date | string
    endDate?: Date | string
  }): ExampleFilters {
    const filters: {
      title?: ExampleTitle
      startDate?: ExampleDate
      endDate?: ExampleDate
    } = {}

    if (title) filters.title = new ExampleTitle(title)
    if (startDate) filters.startDate = new ExampleDate(startDate)
    if (endDate) filters.endDate = new ExampleDate(endDate)

    const feedFilters = new ExampleFilters(filters)

    return feedFilters
  }
}

export interface TempoListItem {
  /**
   * The time in ticks of the tempo change
   */
  tick: number

  /**
   * The time of one beat (in μs), with time base 480 it same to 60,000,000 / BPM
   */
  value: number
}

export enum ScanLineDirection {
  Up = 1,
  Down = -1,
}

export interface PageListItem {
  /**
   * The time in ticks of the page change
   */
  start_tick: number

  /**
   * The time in ticks of the page change
   */
  end_tick: number

  /**
   * The direction of the scan line, -1 is down, 1 is up
   */
  scan_line_direction: ScanLineDirection
}

export enum SpeedChangeEventType {
  Up = 0,
  Down = 1,
}

export enum SpeedChangeEventArg {
  Equal = 'W',
  Faster = 'R',
  Slower = 'G',
}

export interface SpeedChangeEvent {
  /**
   * The type of the speed event, 0 is speed up, 1 is speed down
   */
  type: SpeedChangeEventType

  /**
   * The args of the speed event, it does no effect to playing: 'W' is speed equals base speed, 'R' is greater than the base speed, 'G' is less than the base speed
   */
  args: SpeedChangeEventArg
}

export type EventListItem = SpeedChangeEvent

export interface EventOrderListItem {
  /**
   * The time in ticks of the events
   */
  tick: number

  /**
   * The events need to be executed at the time
   */
  event_list: EventListItem[]
}

export enum NoteType {
  Click = 0,
  Hold = 1,
  LongHold = 2,
  Drag = 3,
  DragChild = 4,
  Flick = 5,
  ClickDrag = 6,
  ClickDragChild = 7,
}

export interface NoteListItem {
  /**
   * The page index of the note
   */
  page_index: number

  /**
   * The type of the note. 0: Click, 1: Hold, 2: Long hold, 3: Drag, 4: Drag child, 5: Flick, 6: Click drag, 7: Click drag child
   */
  type: NoteType

  /**
   * The id of the note
   */
  id: number

  /**
   * The time in ticks of the note
   */
  tick: number

  /**
   * The x position of the note
   */
  x: number

  /**
   * Is there are a note at the same tick
   */
  has_sibling: boolean

  /**
   * The length in ticks of the hold note
   */
  hold_tick: number

  /**
   * The id of the next note
   */
  next_id: number

  /**
   * Is the note in the forward page
   */
  is_forward: boolean
}

export interface C2Chart {
  /**
   * The version of the format of the chart
   */
  format_version: 1

  /**
   * The time base of the chart, ticks per beat, prefer 480
   */
  time_base: number

  /**
   * unused, never used in the game
   */
  start_offset_time: number

  /**
   * The list of tempos in the chart
   */
  tempo_list: TempoListItem[]

  /**
   * The list of pages in the chart
   */
  page_list: PageListItem[]

  /**
   * The list of event order in the chart
   */
  event_order_list: EventOrderListItem[]

  /**
   * The list of notes in the chart
   */
  note_list: NoteListItem[]
}

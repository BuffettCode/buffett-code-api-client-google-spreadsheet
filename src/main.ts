import { echo } from './echo'

declare let global: object

/**
 * Return write arguments.
 */
global['echo'] = echo

/**
 * Returns phone number link from phone.
 *
 * Phone number links cannot contain spaces.
 * @param phone
 */
export const getPhoneNumberLink = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

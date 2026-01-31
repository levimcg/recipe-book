/**
 * 
 * @param {Date} date - A date object
 * @returns string
 */
export default function formatDate(date) {
	if (!date) return;

	const dateObject = new Date(date);

	const formattedDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(dateObject);
	
	return formattedDate;
}
export const MONTHS = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

const currentYear = new Date().getFullYear();
const yearsBefore = [];
for (let i = currentYear - 5; i <= currentYear; i++) {
	yearsBefore.push(i);
}
const yearsAfter = [];
for (let i = currentYear + 1; i <= currentYear + 5; i++) {
	yearsAfter.push(i);
}
export const YEARS = yearsBefore.concat(yearsAfter);

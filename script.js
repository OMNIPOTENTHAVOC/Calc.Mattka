const internalsInput = document.getElementById('internalsInput');
const externalsSlider = document.getElementById('externalsSlider');
const externalsValue = document.getElementById('externalsValue');
const totalMarks = document.getElementById('totalMarks');
const grade = document.getElementById('grade');

function calculateGrade() {
  let internals = parseFloat(internalsInput.value) || 0;
  let externals = parseFloat(externalsSlider.value) || 0;

  // Clamp inputs
  internals = Math.min(Math.max(internals, 0), 60);
  externals = Math.min(Math.max(externals, 0), 75);

  // Convert externals to out of 40
  let externalsConverted = (externals * 40) / 75;

  // Total out of 100
  let total = internals + externalsConverted;
  totalMarks.textContent = total.toFixed(2);

  // Determine grade
  let g = '';
  if (total >= 91) g = 'O';
  else if (total >= 81) g = 'A+';
  else if (total >= 71) g = 'A';
  else if (total >= 61) g = 'B+';
  else if (total >= 56) g = 'B';
  else if (total >= 50) g = 'C';
  else g = 'F';

  grade.textContent = g;
}

// Event listeners
internalsInput.addEventListener('input', calculateGrade);
externalsSlider.addEventListener('input', () => {
  externalsValue.textContent = externalsSlider.value;
  calculateGrade();
});

// Initial calculation
calculateGrade();

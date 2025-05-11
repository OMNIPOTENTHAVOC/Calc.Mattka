const cardsContainer = document.getElementById('cardsContainer');
const addSubjectBtn = document.getElementById('addSubjectBtn');

// Grade Calculation Function (per card)
function calculateGrade(card) {
  const internalsInput = card.querySelector('.internalsInput');
  const externalsSlider = card.querySelector('.externalsSlider');
  const externalsValue = card.querySelector('.externalsValue');
  const totalMarks = card.querySelector('.totalMarks');
  const grade = card.querySelector('.grade');

  let internals = parseFloat(internalsInput.value) || 0;
  let externals = parseFloat(externalsSlider.value) || 0;

  internals = Math.min(Math.max(internals, 0), 60);
  externals = Math.min(Math.max(externals, 0), 75);

  let externalsConverted = (externals * 40) / 75;
  let total = internals + externalsConverted;

  totalMarks.textContent = total.toFixed(2);
  externalsValue.textContent = externals;

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

// Function to create a card
function createCard() {
  const card = document.createElement('div');
  card.className = "bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6";

  card.innerHTML = `
    <!-- Subject Name -->
    <div>
      <input type="text" placeholder="Enter Subject Name" class="subjectName w-full border rounded-lg p-2 text-lg font-semibold" />
    </div>

    <!-- Internals Input -->
    <div>
      <label class="block font-medium mb-1">Internals (out of 
        <input type="number" value="60" class="w-20 border rounded-lg p-1 text-lg inline-block" />
        ):
      </label>
      <input type="number" min="0" max="60" value="0" class="internalsInput w-full border rounded-lg p-2 text-lg" />
    </div>

    <!-- Externals Slider -->
    <div>
      <label class="block font-medium mb-1">Expected Externals (out of 75):</label>
      <input type="range" min="0" max="75" value="0" class="externalsSlider w-full" />
      <p class="mt-1 text-gray-600">Selected: <span class="externalsValue">0</span> / 75</p>
    </div>

    <!-- Result Display -->
    <div class="bg-gray-50 p-4 rounded-lg text-center space-y-2">
      <p class="text-lg">Total Marks: <span class="totalMarks">0</span> / 100</p>
      <p class="text-xl font-bold">Grade: <span class="grade">F</span></p>
    </div>

    <!-- Remove Button -->
    <button class="removeBtn bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">❌ Remove</button>
  `;

  // Event Listeners
  const internalsInput = card.querySelector('.internalsInput');
  const externalsSlider = card.querySelector('.externalsSlider');
  const removeBtn = card.querySelector('.removeBtn');

  internalsInput.addEventListener('input', () => calculateGrade(card));
  externalsSlider.addEventListener('input', () => calculateGrade(card));
  removeBtn.addEventListener('click', () => card.remove());

  // Initial calculation
  calculateGrade(card);

  // Append to container
  cardsContainer.prepend(card);
}

// Add first card by default
createCard();

// Add Subject button event
addSubjectBtn.addEventListener('click', createCard);

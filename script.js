document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navUl.classList.remove('show');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Pharmacy Management System
    const medicineForm = document.getElementById('medicineForm');
    const medicineTable = document.getElementById('medicineTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    
    // Render medicines table
    function renderMedicines(filteredMedicines = null) {
        const medicinesToRender = filteredMedicines || medicines;
        medicineTable.innerHTML = '';
        
        if (medicinesToRender.length === 0) {
            const row = medicineTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6;
            cell.textContent = 'No medicines found. Add some medicines to get started.';
            cell.style.textAlign = 'center';
            return;
        }
        
        medicinesToRender.forEach((medicine, index) => {
            const row = medicineTable.insertRow();
            
            const nameCell = row.insertCell();
            nameCell.textContent = medicine.name;
            
            const categoryCell = row.insertCell();
            categoryCell.textContent = medicine.category;
            
            const quantityCell = row.insertCell();
            quantityCell.textContent = medicine.quantity;
            
            const priceCell = row.insertCell();
            priceCell.textContent = medicine.price.toFixed(2);
            
            const expiryCell = row.insertCell();
            expiryCell.textContent = new Date(medicine.expiry).toLocaleDateString();
            
            const actionsCell = row.insertCell();
            
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn edit-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.addEventListener('click', () => editMedicine(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', () => deleteMedicine(index));
            
            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);
        });
    }
    
    // Add new medicine
    medicineForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const category = document.getElementById('category').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const price = parseFloat(document.getElementById('price').value);
        const expiry = document.getElementById('expiry').value;
        
        const newMedicine = {
            name,
            category,
            quantity,
            price,
            expiry
        };
        
        medicines.push(newMedicine);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        
        renderMedicines();
        medicineForm.reset();
        
        alert('Medicine added successfully!');
    });
    
    // Edit medicine
    function editMedicine(index) {
        const medicine = medicines[index];
        
        document.getElementById('name').value = medicine.name;
        document.getElementById('category').value = medicine.category;
        document.getElementById('quantity').value = medicine.quantity;
        document.getElementById('price').value = medicine.price;
        document.getElementById('expiry').value = medicine.expiry;
        
        // Remove the medicine from the array
        medicines.splice(index, 1);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        
        renderMedicines();
    }
    
    // Delete medicine
    function deleteMedicine(index) {
        if (confirm('Are you sure you want to delete this medicine?')) {
            medicines.splice(index, 1);
            localStorage.setItem('medicines', JSON.stringify(medicines));
            renderMedicines();
        }
    }
    
    // Search and filter medicines
    function filterMedicines() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        let filtered = medicines;
        
        if (searchTerm) {
            filtered = filtered.filter(medicine => 
                medicine.name.toLowerCase().includes(searchTerm)
            );
        }
        
        if (category) {
            filtered = filtered.filter(medicine => 
                medicine.category === category
            );
        }
        
        renderMedicines(filtered);
    }
    
    searchInput.addEventListener('input', filterMedicines);
    categoryFilter.addEventListener('change', filterMedicines);
    
    // Initialize the medicines table
    renderMedicines();
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const department = document.getElementById('department').value;
        const date = document.getElementById('date').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        console.log('Appointment booked:', {
            fullName,
            email,
            phone,
            department,
            date,
            message
        });
        
        alert('Appointment booked successfully! We will contact you shortly to confirm.');
        appointmentForm.reset();
    });
    
    // Set minimum date for appointment to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
});
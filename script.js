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


    // AI Assistant Functionality
    const aiToggle = document.getElementById('aiAssistantToggle');
    const aiContainer = document.querySelector('.ai-container');
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    const aiConversation = document.getElementById('aiConversation');
    const aiUserInput = document.getElementById('aiUserInput');
    const aiSendBtn = document.getElementById('aiSendBtn');
    
    // Toggle AI assistant
    aiToggle.addEventListener('click', () => {
        aiContainer.classList.toggle('show');
    });
    
    // Close AI assistant
    aiCloseBtn.addEventListener('click', () => {
        aiContainer.classList.remove('show');
    });
    
    // Send message when button is clicked
    aiSendBtn.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    aiUserInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const userMessage = aiUserInput.value.trim();
        if (userMessage === '') return;
        
        // Add user message to conversation
        addMessage(userMessage, 'user');
        aiUserInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Generate AI response
            const aiResponse = generateAIResponse(userMessage);
            addMessage(aiResponse, 'bot');
            
            // Scroll to bottom of conversation
            aiConversation.scrollTop = aiConversation.scrollHeight;
        }, 1500);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-${sender}`;
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        messageDiv.appendChild(messageText);
        aiConversation.appendChild(messageDiv);
        
        // Scroll to bottom of conversation
        aiConversation.scrollTop = aiConversation.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message ai-bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        aiConversation.appendChild(typingDiv);
        aiConversation.scrollTop = aiConversation.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function generateAIResponse(userMessage) {
        // Convert user message to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Common questions and responses
        const responses = {
            'hello|hi|hey': 'Hello! How can I assist you today?',
            'how are you': "I'm just a computer program, but I'm functioning well! How can I help you?",
            'bye|goodbye': 'Goodbye! Feel free to come back if you have more questions.',
            'thank you|thanks': "You're welcome! Is there anything else I can help with?",
            'opening hours|when are you open': 'Our hospital is open 24/7 for emergency services. Outpatient hours are from 8am to 6pm daily.',
            'location|where are you located|address': 'We are located at 123 Hospital Road, Nairobi, Kenya.',
            'phone number|contact number|telephone': 'You can reach us at +254 700 123 456.',
            'email|contact email': 'Our email address is info@gedwellhospital.co.ke',
            'services|what services do you offer': 'We offer a wide range of services including emergency care, inpatient and outpatient services, laboratory tests, imaging services, and pharmacy services. You can find more details on our Services section.',
            'doctors|specialists': 'We have qualified specialists in various fields including cardiology, pediatrics, gynecology, and general surgery. Check our Doctors section for more information.',
            'appointment|book appointment|how to book': 'You can book an appointment by filling out the form in our Contact section or by calling our reception.',
            'pharmacy|medicine|drugs': 'Our pharmacy is well-stocked with both prescription and over-the-counter medications. It\'s open from 7am to 10pm daily.',
            'emergency|emergency services': 'Our emergency department is open 24/7 with rapid response teams always available. In case of emergency, please come directly or call our emergency line.',
            'insurance|do you accept insurance': 'We accept most major insurance providers. Please bring your insurance card when visiting.',
            'covid|coronavirus': 'We have full COVID-19 protocols in place. Please wear a mask when visiting and use our hand sanitizing stations.',
            'parking|car park': 'We have ample parking space available for patients and visitors free of charge.',
            'visiting hours|can i visit a patient': 'General visiting hours are from 10am to 6pm. ICU visits are limited to 30 minutes twice daily.'
        };
        
        // Check if message matches any predefined questions
        for (const [pattern, response] of Object.entries(responses)) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(message)) {
                return response;
            }
        }
        
        // Default response if no match found
        return "I'm sorry, I didn't understand your question. Could you please rephrase it or ask about our services, doctors, appointments, or location?";
    }
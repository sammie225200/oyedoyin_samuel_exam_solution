    let localtasks = [];
    let generalFilter = 'all';
    function getTask() {
        const saves = localStorage.getItem('studyTasks');
        if (saves) {
            localtasks = JSON.parse(saves);
            displayTasks();
        }
    }
    function saveTasks() {
        localStorage.setItem('studyTasks', JSON.stringify(localtasks));
    }
    function addTask(subject, priority, studyforDate) {
        const task = {
            id: Date.now(),
            subject: subject,
            priority: priority,
            studyforDate: studyforDate,
            completed: false,
            createdAt: new Date().toISOString()
        };
       localtasks.push(task);
        saveTasks();
        displayTasks();
    }
    function deleteTask(id) {
        localtasks = localtasks.filter(task => task.id !== id);
        saveTasks();
        displayTasks();
    }
    function status(id) {
        const task = localtasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        }
    }
    function dateFunction(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    function displayTasks() {
        const container = document.getElementById('tasksContainer');
        let filteredTasks = localtasks;
        if (generalFilter === 'completed') {
            filteredTasks = localtasks.filter(t => t.completed);
        } else if (generalFilter === 'pending') {
            filteredTasks = localtasks.filter(t => !t.completed);
        }
        if (filteredTasks.length === 0) {
            container.innerHTML = `
                <div class="message">
                    <i class="fas fa-clipboard-list"></i>
                    <p>${generalFilter === 'all' ? 'No study tasks yet. Add your first task to get started!' : `No ${generalFilter} tasks found.`}</p>
                </div>
            `;
            return;
        }
        container.innerHTML = filteredTasks.map(task => `
            <div class="task-p ${task.completed ? 'completed' : ''}">
                <div class="indicator priority-${task.priority}"></div>
                <input type="checkbox" class="task-checkbox"
                       ${task.completed ? 'checked' : ''}
                       onchange="status(${task.id})">              <div class="task-m">
                    <div class="task-subject">${task.subject}</div>
                    <div class="task-details">
                        <div class="task-detail-item">
                            <span class="priority-badge ${task.priority}">${task.priority.toUpperCase()}</span>
                        </div>
                        <div class="task-detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${dateFunction(task.studyforDate)}</span>
                        </div>
                        <div class="task-detail-item">
                            <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-clock'}"></i>
                            <span>${task.completed ? 'Completed' : 'Pending'}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-delete" onclick="deleteTask(${task.id})">                      <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    document.getElementById('plannerTForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const priority = document.getElementById('priority').value;
        const studyforDate = document.getElementById('studyforDate').value;
        addTask(subject, priority, studyforDate);
        this.reset();
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            generalFilter = this.dataset.filter;
            displayTasks();
        });
    });
    getTask();

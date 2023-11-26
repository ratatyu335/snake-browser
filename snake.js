const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let score = 0;

let direction = 'right';

function draw() {
    // ������� ������
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ��������� ������
    ctx.fillStyle = '#00F';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // ��������� ������
    ctx.fillStyle = '#F00';
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

    // ����������� �����
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }

    // �������� �� ������������ �� ������
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        gameOver();
        return;
    }

    // �������� �� ������������ � �����
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // �������� �� �������� ������
    if (head.x === apple.x && head.y === apple.y) {
        score += 1;
        spawnApple();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function spawnApple() {
    apple = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    };

    // ��������, ����� ������ �� ��������� �� ������
    while (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
        apple = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        };
    }
}

function gameOver() {
    alert('Game Over! Your score: ' + score);
    resetGame();
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    apple = { x: 15, y: 15 };
    score = 0;
    direction = 'right';
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
}

document.addEventListener('keydown', handleKeyPress);

function gameLoop() {
    move();
    draw();
}

// ������������� ����
spawnApple();
setInterval(gameLoop, 100);

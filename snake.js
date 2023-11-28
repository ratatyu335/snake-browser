const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let score = 0;

let direction = 'right';

function draw() {
    // Î÷èñòêà õîëñòà
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ðèñîâàíèå çìåéêè
    ctx.fillStyle = '#008000';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // Ðèñîâàíèå ÿáëîêà
    ctx.fillStyle = '#F00';
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

    // Îòîáðàæåíèå ñ÷åòà
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

    // Ïðîâåðêà íà ñòîëêíîâåíèå ñî ñòåíîé
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        gameOver();
        return;
    }

    // Ïðîâåðêà íà ñòîëêíîâåíèå ñ ñîáîé
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // Ïðîâåðêà íà ïîåäàíèå ÿáëîêà
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

    // Ïðîâåðêà, ÷òîáû ÿáëîêî íå ïîÿâèëîñü íà çìåéêå
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

// Èíèöèàëèçàöèÿ èãðû
spawnApple();
setInterval(gameLoop, 100);

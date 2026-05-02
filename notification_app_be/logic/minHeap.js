class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    pop() {
        if (this.size() === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return root;
    }

    bubbleUp() {
        let index = this.size() - 1;

        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);

            if (this.heap[parent].score <= this.heap[index].score) break;

            [this.heap[parent], this.heap[index]] =
                [this.heap[index], this.heap[parent]];

            index = parent;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.size();

        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length &&
                this.heap[left].score < this.heap[smallest].score) {
                smallest = left;
            }

            if (right < length &&
                this.heap[right].score < this.heap[smallest].score) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] =
                [this.heap[smallest], this.heap[index]];

            index = smallest;
        }
    }

    getAllSorted() {
        return this.heap.sort((a, b) => b.score - a.score);
    }
}

module.exports = MinHeap;
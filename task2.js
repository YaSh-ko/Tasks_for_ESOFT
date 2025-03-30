function copyObj(obj, weakMap = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (weakMap.has(obj)) {
        return weakMap.get(obj);
    }

    if (Array.isArray(obj)) {
        const newArr = [];
        weakMap.set(obj, newArr);
        for (let i = 0; i < obj.length; i++) {
            newArr[i] = copyObj(obj[i], weakMap);
        }
        return newArr;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof Map) {
        const newMap = new Map();
        weakMap.set(obj, newMap);
        obj.forEach((value, key) => {
            newMap.set(copyObj(key, weakMap), copyObj(value, weakMap));
        });
        return newMap;
    }

    if (obj instanceof Set) {
        const newSet = new Set();
        weakMap.set(obj, newSet);
        obj.forEach(value => {
            newSet.add(copyObj(value, weakMap));
        });
        return newSet;
    }

    const newObj = Object.create(Object.getPrototypeOf(obj));
    weakMap.set(obj, newObj);

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = copyObj(obj[key], weakMap);
        }
    }

    return newObj;
}

let obj = {
    name: 'Yasha',
    age: 20,
    date: new Date(),
    langs: [['js', 'html', 'css'], 'C++', 'C'],
    study() {
        console.log("I like to study");
    },
    wishes: {
        job: "Interesting job",
        salary: 1_000_000,
        car: "Lambargini",
    },
    map: new Map([['key', 'value']]),
    set: new Set([1, 2, 3]),
};

obj.self = obj;

let newObj = copyObj(obj);
newObj.langs = ['ru', 'en'];
newObj.wishes = { job: 'Very interesting job' };
newObj.map.set('key', 'new value');
newObj.set.add(4);

console.log(obj);
console.log(newObj);
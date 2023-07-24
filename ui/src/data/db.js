let letters=[
        {id:1,text:"`",active:false},
        {id:2,text:"1",active:false},
        {id:3,text:"2",active:false},
        {id:4,text:"3",active:false},
        {id:5,text:"4",active:false},
        {id:6,text:"5",active:false},
        {id:7,text:"6",active:false},
        {id:8,text:"7",active:false},
        {id:9,text:"8",active:false},
        {id:10,text:"9",active:false},
        {id:11,text:"0",active:false},
        {id:12,text:"-",active:false},
        {id:13,text:"=",active:false},
        {id:14,text:"Backspace",active:false},
        {id:15,text:"Tab",active:false},
        {id:16,text:"Q",active:false},
        {id:17,text:"W",active:false},
        {id:18,text:"E",active:false},
        {id:19,text:"R",active:false},
        {id:20,text:"T",active:false},
        {id:21,text:"Y",active:false},
        {id:22,text:"U",active:false},
        {id:23,text:"I",active:false},
        {id:24,text:"O",active:false},
        {id:25,text:"P",active:false},
        {id:26,text:"[",active:false},
        {id:27,text:"]",active:false},
        {id:28,text:"\\",active:false},
        {id:29,text:"CapsLock",active:false},
        {id:30,text:"A",active:false},
        {id:31,text:"S",active:false},
        {id:32,text:"D",active:false},
        {id:33,text:"F",active:false},
        {id:34,text:"G",active:false},
        {id:35,text:"H",active:false},
        {id:36,text:"J",active:false},
        {id:37,text:"K",active:false},
        {id:38,text:"L",active:false},
        {id:39,text:";",active:false},
        {id:40,text:"'",active:false},
        {id:41,text:"Enter",active:false},
        {id:42,text:"Shift_l",active:false},
        {id:43,text:"Z",active:false},
        {id:44,text:"X",active:false},
        {id:45,text:"C",active:false},
        {id:46,text:"V",active:false},
        {id:47,text:"B",active:false},
        {id:48,text:"N",active:false},
        {id:49,text:"M",active:false},
        {id:50,text:",",active:false},
        {id:51,text:".",active:false},
        {id:52,text:"/",active:false},
        {id:53,text:"?",active:false},
        {id:54,text:"Shift_r",active:false},
        {id:55,text:"Ctrl",active:false},
        {id:56,text:"Win",active:false},
        {id:57,text:"Alt",active:false},
        {id:58,text:" ",active:false},
        {id:59,text:"Alt",active:false},
        {id:60,text:"Fn",active:false},
        {id:61,text:"Ctrl",active:false},
]

const getData =()=>letters;

const updateLetter=(id,toBeUpdated)=>{
    letters=letters.map((item)=>(
        item.id === id ? {...item,active:toBeUpdated}:item
    ))
    return letters
};

export { 
    getData, 
    updateLetter 
};

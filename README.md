# TODO List App

### 1. ทำการสร้างหน้าเวบ My ToDo List โดยใช้ HTML และ Bulma CSS และ Vue JS ดังรูป
- รายการ Task เป็น Checkbox และเมื่อติ้ก Checkbox จะเปลี่ยนสถานะของ Task เป็น "Completed" และขีดฆ่าชื่อ Task นั้น
```
style="text-decoration: line-through;"
```
- สามารถเพิ่มรายการใหม่เข้าไปได้โดยการพิมพ์ชื่อ Task ใน Textbox "Task Name" ด้านล่าง แล้วกดปุ่ม "Add New Task"
- โดย Default เมื่อสร้าง Task ขึ้นใหม่จะมีสถานะ "Incomplete" เสมอ

![ToDo1](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo1.png)

### 2. เพิ่มปุ่ม icon รูปดินสอ เมื่อกดแล้วให้มี [Modal](https://bulma.io/documentation/components/modal/) เปิดขึ้นมาสำหรับแก้ไขดังรูป
- หน้า Modal มีส่วนประกอบดังนี้
  1. ช่อง Textbox สำหรับแก้ไขชื่อ Task
  2. ปุ่ม "Save" เมื่อกดจะทำการบันทึกการแก้ไข

![ToDo2](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo2.png)

### 3. เพิ่มปุ่ม icon รูปถังขยะ สำหรับลบรายการ Task นั้น ๆ เมื่อกดแล้วให้มี [Modal](https://bulma.io/documentation/components/modal/) เปิดขึ้นมาสำหรับยืนยันการลบดังรูป
- โดยแสดงคำแจ้งเตือน `Are you sure you want to delete 'ชื่อ task'?`

![ToDo3](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo3.png)

### 4. ด้านบนของรายการ ToDo ให้แสดงผลการนับจำนวน Task ที่มีสถานะ Completed และ Incomplete ดังรูป
***จะต้องใช้ Computed Properties เท่านั้น***

![ToDo4](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo4.png)

### 5. เพิ่ม Filters สำหรับการกรองรายการ Task โดยสามารถกรองได้ดังนี้
- "Hide completed tasks" เป็น Checkbox คือเมื่อติ้กจะทำการ**ซ่อน** Task ที่มีสถานะ "Complete"
- "Sort incomplete tasks" เป็น Checkbox คือเมื่อติ้กจะทำเรียงลำดับ (Sort) รายการ Task โดยเอารายการที่มีสถานะ "Incomplete" ขึ้นไว้ด้านบน ในกรณีที่ไม่ติ้กจะ Sort ด้วยชื่อของ Task

![ToDo5](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo5.png)

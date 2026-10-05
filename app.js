const { MongoClient, ObjectId } = require('mongodb');

// رابط الاتصال بقاعدة بيانات MongoDB المحلية (أو سحابية حسب دراستك)
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'taskDatabase'; // اسم القاعدة

async function runTask() {
    try {
        // الاتصال بقاعدة البيانات
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // 1. استخدام insertOne لإضافة مستخدمين
        const insertOneResult = await usersCollection.insertMany([
            { name: "Amani", age: 25, city: "Cairo" },
            { name: "Ahmed", age: 30, city: "Alex" }
        ]);
        console.log("1. Inserted One/Two IDs:", insertOneResult.insertedIds);

        // 2. استخدام insertMany لإضافة 10 مستخدمين (5 منهم عمرهم 27)
        const manyUsers = [
            { name: "User1", age: 27, city: "Giza" },
            { name: "User2", age: 27, city: "Aswan" },
            { name: "User3", age: 27, city: "Luxor" },
            { name: "User4", age: 27, city: "Tanta" },
            { name: "User5", age: 27, city: "Mansoura" },
            { name: "User6", age: 22, city: "Damietta" },
            { name: "User7", age: 24, city: "Suez" },
            { name: "User8", age: 29, city: "Qena" },
            { name: "User9", age: 35, city: "Sohag" },
            { name: "User10", age: 40, city: "Minya" }
        ];
        const insertManyResult = await usersCollection.insertMany(manyUsers);
        console.log("2. Number of inserted documents:", insertManyResult.insertedCount);

        // 3. استخدام find لعرض كل من عمره 27
        const age27Users = await usersCollection.find({ age: 27 }).toArray();
        console.log("3. Users with age 27:", age27Users);

        // 4. استخدام limit لعرض أول 3 مستخدمين عمرهم 27
        const limitedUsers = await usersCollection.find({ age: 27 }).limit(3).toArray();
        console.log("4. First 3 users with age 27:", limitedUsers);

        // 5. استخدام findOne للبحث باستخدام _id (نأخذ أول وثيقة كمثال)
        const sampleUser = age27Users[0];
        const foundUser = await usersCollection.findOne({ _id: new ObjectId(sampleUser._id) });
        console.log("5. Found user by ID:", foundUser);

        // 6. استخدام countDocuments لعد المستخدمين الذين عمرهم 27
        const count = await usersCollection.countDocuments({ age: 27 });
        console.log("6. Count of users with age 27:", count);

        // 7. استخدام updateOne لتحديث الاسم وزيادة العمر باستخدام $set و $inc
        const updateOneResult = await usersCollection.updateOne(
            { _id: new ObjectId(sampleUser._id) },
            { $set: { name: "Amani Arafa" }, $inc: { age: 1 } }
        );
        console.log("7. Modified documents count:", updateOneResult.modifiedCount);

        // 8. استخدام updateMany لزيادة عمر جميع المستخدمين 5 سنوات
        const updateManyResult = await usersCollection.updateMany({}, { $inc: { age: 5 } });
        console.log("8. UpdateMany modified count:", updateManyResult.modifiedCount);

        // 9. استخدام deleteOne لحذف مستخدم باستخدام الـ _id
        const deleteOneResult = await usersCollection.deleteOne({ _id: new ObjectId(sampleUser._id) });
        console.log("9. Deleted documents count (deleteOne):", deleteOneResult.deletedCount);

        // 10. استخدام deleteMany لحذف المستخدمين بناءً على شرط معين
        const deleteManyResult = await usersCollection.deleteMany({ city: "Cairo" });
        console.log("10. Deleted count (deleteMany):", deleteManyResult.deletedCount);

    } catch (err) {
        console.error("Error occurred:", err);
    } finally {
        // غلق الاتصال عند الانتهاء
        await client.close();
    }
}

runTask();



// إضافة مستخدمين اثنين باستخدام insertOne
// وإظهار insertedId لكل مستخدم.
// إضافة 10 مستخدمين أو أكثر باستخدام insertMany
// ويكون 5 منهم عمرهم 27 سنة، ثم إظهار عدد المستخدمين الذين تمت إضافتهم.
// عرض جميع المستخدمين الذين عمرهم 27 سنة
// باستخدام find.
// عرض أول 3 مستخدمين فقط الذين عمرهم 27 سنة
// باستخدام limit.
// البحث عن مستخدم واحد باستخدام الـ _id
// باستخدام findOne، وعرض بياناته إذا تم العثور عليه.
// حساب عدد المستخدمين الذين عمرهم 27 سنة
// باستخدام countDocuments.
// تعديل مستخدم واحد
// باستخدام updateOne:
// تغيير اسمه باستخدام $set.
// زيادة عمره باستخدام $inc.
// عرض عدد المستخدمين الذين تم تعديلهم.
// زيادة عمر جميع المستخدمين 5 سنوات
// باستخدام updateMany و$inc.
// حذف مستخدم واحد باستخدام _id
// باستخدام deleteOne، وعرض عدد المستخدمين الذين تم حذفهم.
// حذف جميع المستخدمين الذين يحققون شرطًا معينًا
// // باستخدام deleteMany، ثم عرض عدد المحذوفين باستخدام deletedCount.؟



// 1- إضافة مستخدمين
// 2- إضافة 10 مستخدمين
// 3- عرض المستخدمين عمر 27
// 4- عرض أول 3 منهم
// 5- البحث عن مستخدم بالـ ID
// 6- حساب عدد عمر 27
// 7- تعديل مستخدم واحد
// 8- زيادة عمر الجميع 5 سنوات
// 9- حذف مستخدم واحد بالـ ID
// 10- حذف المستخدمين حسب شرط
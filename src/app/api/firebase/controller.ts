import {
  DocumentData,
  QueryConstraint,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';

import { db } from './db';

export async function add(tableName: string, params: any) {
  try {
    const docRef = await addDoc(collection(db, tableName), {
      ...params,
      created_time: Timestamp.now(),
      updated_time: Timestamp.now(),
    });
    return { data: { id: docRef.id }, message: 'success', status: 1 };
  } catch (e) {
    console.error('Error adding document:', e);
    return { data: null, message: 'fail', status: 0 };
  }
}

export async function get(tableName: string, ...args: QueryConstraint[]) {
  try {
    let docRef = null as DocumentData | null;
    const q = query(collection(db, tableName), ...args);
    // @ts-ignore
    const querySnapshot = await getDocs(q, ...args);

    querySnapshot.forEach((item) => {
      const data = item.data();
      if (data) {
        docRef = data;
      }
    });
    console.log('docRef', docRef);
    return {
      data: {
        ...docRef,
      },
      message: 'success',
      status: 1,
    };
  } catch (e) {
    console.log('e: ', e);
    return { data: null, message: 'fail', status: 0 };
  }
}
export async function getList(tableName: string, ...args: QueryConstraint[]) {
  try {
    const list = [] as DocumentData[];
    const q = query(collection(db, tableName), ...args);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      const data = item.data();
      if (data) {
        list.push(data);
      }
    });

    return {
      data: {
        list,
      },
      message: 'success',
      status: 1,
    };
  } catch (e) {
    console.log('e: ', e);
    return { data: null, message: 'fail', status: 0 };
  }
}

export async function update(tableName: string, params: any, ...args: QueryConstraint[]) {
  try {
    const ids = [] as string[];
    const q = query(collection(db, tableName), ...args);
    const querySnapshot = await getDocs(q);
    const asyncFn = async () => {
      return new Promise<void>((resolve) => {
        querySnapshot.forEach(async (item) => {
          if (item.id) {
            await updateDoc(doc(db, tableName, item.id), {
              ...params,
              updated_time: Timestamp.now(),
            });
            ids.push(item.id);
          }
        });
        resolve();
      });
    };
    await asyncFn();
    return {
      data: {
        ids,
      },
      message: 'success',
      status: 1,
    };
  } catch (e) {
    console.log('e: ', e);
    return { data: null, message: 'fail', status: 0 };
  }
}

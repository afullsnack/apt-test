'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logoutAction = async () => {
  try {
    const response = cookies().delete('cbt_student_auth')
    console.log(response, ':::cookie deleted')

    redirect('/')
    // return true
  } catch (error: any) {
    console.log(error, ':::error deleting cookie')
    return false
  }
}

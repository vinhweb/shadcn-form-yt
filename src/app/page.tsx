'use client'

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {useForm} from "react-hook-form";
import {registerSchema} from "@/validators/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/components/ui/use-toast";
import {motion} from 'framer-motion'


export default function Home() {
  const [formStep, setFormStep] = React.useState(0);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      studentId: '',
      year: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    if(values.password !== values.confirmPassword){
      toast({
        title: 'Password không khớp',
        variant: 'destructive'
      })
    } else {
      alert(JSON.stringify(values))
      console.log(values)
    }
  }

  return (
    <div className={'flex min-h-screen w-full items-center justify-center'}>
      <Toaster/>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Perfect Shadcn Form</CardTitle>
          <CardDescription>Tạo một form hoàn hảo với Shadcn UI</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative space-y-3 overflow-x-hidden">
                <motion.div
                  className={cn('space-y-3', {
                    // hidden: formStep == 1,
                  })}
                  // step 0 -> x = 0
                  // step 1 -> x = -100%
                  animate={{
                    translateX: `-${formStep * 100}%`
                  }}
                  transition={{
                    ease: 'easeInOut'
                  }}
                >
                  {/*name*/}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Tên bạn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/*email*/}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/*student id*/}
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Student ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/*year*/}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Năm học</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={'Hãy chọn năm học'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[2013, 2014, 2015].map((year) => {
                              return (
                                <SelectItem value={year.toString()} key={year}>
                                  Năm {year}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  className={cn('space-y-3 absolute top-0 left-0 right-0', {
                    // hidden: formStep == 0,
                  })}
                  // step 0 -> x = +100%
                  // step 1 -> x = 0
                  initial={{
                    translateX: `${100 - formStep * 100}%`
                  }}
                  animate={{
                    translateX: `${100 - formStep * 100}%`
                  }}
                  transition={{
                    ease: 'easeInOut'
                  }}
                >
                  {/*password*/}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Password" {...field} type={'password'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/*confirm password*/}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Confirm Password" {...field} type={'password'} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <div className="flex gap-2">
                  <Button
                    type={'submit'}
                    className={cn( {
                      hidden: formStep == 0,
                    })}
                  >
                    Submit
                  </Button>
                  <Button
                    type={'button'}
                    variant={'ghost'}
                    className={cn( {
                      hidden: formStep == 1,
                    })}
                    onClick={()=>{
                      // validation
                      form.trigger(['email', 'name', 'year', 'studentId'])
                      const emailState = form.getFieldState('email')
                      const nameState = form.getFieldState('name')
                      const yearState = form.getFieldState('year')
                      const idState = form.getFieldState('studentId')

                      if(!emailState.isDirty || emailState.invalid) return
                      if(!nameState.isDirty || nameState.invalid) return
                      if(!yearState.isDirty || yearState.invalid) return
                      if(!idState.isDirty || idState.invalid) return

                      setFormStep(1)
                    }}
                  >
                    Tiếp
                  </Button>
                  <Button
                    variant={'ghost'}
                    type={'button'}
                    className={cn( {
                      hidden: formStep == 0,
                    })}
                    onClick={()=>{
                      setFormStep(0)
                    }}
                  >
                    Quay lại
                  </Button>

                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
